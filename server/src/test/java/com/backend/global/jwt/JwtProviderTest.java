package com.backend.global.jwt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JwtProviderTest {

    private JwtProvider jwtProvider;

    @BeforeEach
    void setUp() {
        jwtProvider = new JwtProvider(
                "test-secret-key-must-be-at-least-32-characters-long",
                3600000L,
                1209600000L
        );
    }

    @Test
    void 액세스토큰_생성_후_memberId_추출() {
        String token = jwtProvider.generateAccessToken(1L, "MENTEE");

        assertThat(jwtProvider.getMemberId(token)).isEqualTo(1L);
    }

    @Test
    void 액세스토큰_생성_후_role_추출() {
        String token = jwtProvider.generateAccessToken(1L, "MENTOR");

        assertThat(jwtProvider.getRole(token)).isEqualTo("MENTOR");
    }

    @Test
    void 유효한_토큰은_만료되지_않음() {
        String token = jwtProvider.generateAccessToken(1L, "MENTEE");

        assertThat(jwtProvider.isExpired(token)).isFalse();
    }

    @Test
    void 만료된_토큰은_isExpired_true() {
        JwtProvider expiredProvider = new JwtProvider(
                "test-secret-key-must-be-at-least-32-characters-long",
                -1L,
                -1L
        );
        String token = expiredProvider.generateAccessToken(1L, "MENTEE");

        assertThat(expiredProvider.isExpired(token)).isTrue();
    }

    @Test
    void 리프레시토큰_생성_후_memberId_추출() {
        String token = jwtProvider.generateRefreshToken(2L, "MENTOR");

        assertThat(jwtProvider.getMemberId(token)).isEqualTo(2L);
    }
}
