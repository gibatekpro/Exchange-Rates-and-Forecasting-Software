package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.model.ForecastApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastRequestBody;
import com.gibatekpro.exchange_rate_app_springboot.model.TimeSeriesApiResponse;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Data
@Service
@RequiredArgsConstructor
public class ForecastServiceImpl implements ForecastService {

    private final Logger logger = Logger.getLogger(ConversionServiceImpl.class.getName());
    private final ConversionService conversionService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    @Transactional
    public ForecastApiResponse getForecastFromExponentialMovingAverage(ForecastRequestBody forecastRequestBody) {
        //Exponential Moving Average (EMA) is used here
        /**
         *
         * EMA_t = [V_t * (s/(1+d))] + [EMA_y * (1 - (s/(1+d)))]
         *
         * Where:
         *      EMA_t = Exponential Moving Average for today
         *      V_t = Price or Value for today
         *      s/(1+d) = Smoothing factor
         *      s = 2
         *      d = smoothing period
         *      EMA_y = Exponential Moving Average for yesterday
         *
         * */


        //Fetches the days for the time-series
        LocalDate previousStartDate = forecastRequestBody.getStartDate().minusDays(10);
        LocalDate previousEndDate = forecastRequestBody.getStartDate().minusDays(0);
        //Fetches the time-series data for the previous 10 days
        TimeSeriesApiResponse previousTimeSeriesResponse = conversionService.fetchTimeSeriesConversion(
                forecastRequestBody.getBaseCurrency(),
                forecastRequestBody.getForecastCurrency(),
                previousStartDate,
                previousEndDate
        );


        ForecastApiResponse response = createForecastData(forecastRequestBody, previousTimeSeriesResponse);


        return response;
    }

    private ForecastApiResponse createForecastData(ForecastRequestBody forecastRequestBody, TimeSeriesApiResponse previousTimeSeriesResponse) {
        //Initializes EMA calculation
        Map<String, Map<String, Double>> emaRates = new LinkedHashMap<>();
        double emaPrevious = 0.0;
        double valueToday = 0.0;
        double emaToday = 0.0;
        boolean isFirstCalculation = true;
        int smoothingPeriod = 10;
        double smoothingFactor = 2.0 / (smoothingPeriod + 1);
        LocalDate currentDateBeingCalculated = forecastRequestBody.getStartDate();
        int checkCount = 0;

        while (!currentDateBeingCalculated.isAfter(forecastRequestBody.getEndDate())) {

            if (isFirstCalculation) {

                //If it is the first calculation, then use SMA (Simple moving Average) as EMA_y or emaPrevious
                double totalRates = 0.0;
                int count = 0;

                for (Map.Entry<String, Map<String, Double>> entry : previousTimeSeriesResponse.getRates().entrySet()) {
                    double rate = entry.getValue().get(forecastRequestBody.getForecastCurrency());
                    totalRates += rate;
                    count++;
                }

                // If count is 0 (which should not happen if there is data), handle this appropriately.
                if (count > 0) {
                    emaPrevious = totalRates / count;
                } else {

                    emaPrevious = 0.0;
                }

                isFirstCalculation = false;
            }

            //Calculate valueToday for the current date being calculated
            //Now calculate EMA_t (Value today)
            List<Double> prices = previousTimeSeriesResponse.getRates().values().stream()
                    .map(map -> map.get(forecastRequestBody.getForecastCurrency()))
                    .toList();

            valueToday = prices.get(prices.size() - 1);

            emaToday = ((valueToday * smoothingFactor) + (emaPrevious * (1 - smoothingFactor)));

            emaPrevious = emaToday;

            checkCount++;

            //Now, the ema rates are being stored
            Map<String, Double> rateMap = new LinkedHashMap<>();
            rateMap.put(forecastRequestBody.getForecastCurrency(), emaToday);
            emaRates.put(currentDateBeingCalculated.toString(), rateMap);


            currentDateBeingCalculated = currentDateBeingCalculated.plusDays(1);
        }

        //Remove today's forecast, it is not needed
        emaRates.remove(previousTimeSeriesResponse.getEndDate());

        ForecastApiResponse response = new ForecastApiResponse();
        response.setSuccess(true);
        response.setTimeSeries(true);
        response.setStartDate(forecastRequestBody.getStartDate().toString());
        response.setEndDate(forecastRequestBody.getEndDate().toString());
        response.setBaseCurrency(forecastRequestBody.getBaseCurrency());
        response.setForecastCurrency(forecastRequestBody.getForecastCurrency());
        response.setRates(emaRates);
        return response;
    }

    @Override
    @Transactional
    public ForecastApiResponse getForecastFromSimpleMovingAverage(ForecastRequestBody forecastRequestBody) {
        //Fetches the previous 10 days for the time-series data
        LocalDate previousStartDate = forecastRequestBody.getStartDate().minusDays(10);
        LocalDate previousEndDate = forecastRequestBody.getStartDate().minusDays(0);

        //Fetches the time-series data for the previous 10 days
        TimeSeriesApiResponse previousTimeSeriesResponse = conversionService.fetchTimeSeriesConversion(
                forecastRequestBody.getBaseCurrency(),
                forecastRequestBody.getForecastCurrency(),
                previousStartDate,
                previousEndDate
        );

        //Creates the SMA Forecast data
        ForecastApiResponse response = createSmaForecastData(forecastRequestBody, previousTimeSeriesResponse);

        return response;
    }

    private ForecastApiResponse createSmaForecastData(ForecastRequestBody forecastRequestBody, TimeSeriesApiResponse previousTimeSeriesResponse) {
        //Initializes the SMA calculation
        Map<String, Map<String, Double>> smaRates = new LinkedHashMap<>();
        List<Double> currentWindow = previousTimeSeriesResponse.getRates().values().stream()
                .map(map -> map.get(forecastRequestBody.getForecastCurrency()))
                .collect(Collectors.toList());

        LocalDate currentDateBeingCalculated = forecastRequestBody.getStartDate();

        while (!currentDateBeingCalculated.isAfter(forecastRequestBody.getEndDate())) {
            //Calculates the current SMA
            double smaToday = currentWindow.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);

            Map<String, Double> rateMap = new LinkedHashMap<>();
            rateMap.put(forecastRequestBody.getForecastCurrency(), smaToday);
            smaRates.put(currentDateBeingCalculated.toString(), rateMap);

            //Updates the window for the next day
            currentWindow.remove(0);
            currentWindow.add(smaToday);

            currentDateBeingCalculated = currentDateBeingCalculated.plusDays(1);
        }

        //Remove today's forecast, it is not needed
        smaRates.remove(previousTimeSeriesResponse.getEndDate());


        ForecastApiResponse response = new ForecastApiResponse();
        response.setSuccess(true);
        response.setTimeSeries(true);
        response.setStartDate(forecastRequestBody.getStartDate().toString());
        response.setEndDate(forecastRequestBody.getEndDate().toString());
        response.setBaseCurrency(forecastRequestBody.getBaseCurrency());
        response.setForecastCurrency(forecastRequestBody.getForecastCurrency());
        response.setRates(smaRates);
        return response;
    }


    @Override
    @Transactional
    public ForecastApiResponse getForecastFromLeastSquare(ForecastRequestBody forecastRequestBody) {
        return null;
    }

}
