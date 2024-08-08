package com.gibatekpro.exchange_rate_app_springboot.config.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
@RequiredArgsConstructor
public class RequestFilter extends OncePerRequestFilter {

    private final Logger logger = Logger.getLogger(getClass().getName());
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, //Intercepts every http request
                                    @NonNull HttpServletResponse response, //Alter the response
                                    @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization"); //The jwt token is passed within this header
        final String jwtToken; // This is the token that will be gotten from the header
        final String uid; // This will be extracted from the jwt token. It is the user's firebase ID

        logger.info("doFilterInternal" );

        if (authHeader == null
                ||
                !authHeader.startsWith("Bearer ") // The header must start with Bearer
        ) {
            logger.warning("doFilterInternal: No Token" );
            filterChain.doFilter(request, response);// The header does not contain a token, move on to next filter
            return;
        }

        jwtToken = authHeader.substring(7); // Extract the token from the header "Bearer {the token}"
        // jwtToken comes from the client app
        try {

            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(jwtToken); //Use Firebase to decode the token
            uid = decodedToken.getUid(); // Get the uid from the token
        } catch (FirebaseAuthException e) {
            logger.warning("doFilterInternal: Invalid token");
            throw new RuntimeException(e);
        }

        if (uid != null
                &&
                SecurityContextHolder.getContext().getAuthentication() == null // User is not already authenticated
        ) {
            logger.info("doFilterInternal There is token, Not Authenticated" );

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(uid);
            //Having a token does not mean the person is authenticated
            //So we will use the person's current token to authenticate the person

            logger.info("doFilterInternal There is token, Not Authenticated, Token is valid" );
            PreAuthenticatedAuthenticationToken authenticationToken = new PreAuthenticatedAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            logger.info("doFilterInternal " + authenticationToken.getAuthorities() );
            authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            logger.info("doFilterInternal There is token, Not Authenticated" + authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response); // Don't forget
    }
}
