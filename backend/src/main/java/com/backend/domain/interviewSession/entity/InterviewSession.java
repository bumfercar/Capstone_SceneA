package com.backend.domain.interviewSession.entity;

import com.backend.domain.member.entity.Member;
import com.backend.global.exception.CustomException;
import com.backend.global.exception.ErrorCode;
import com.backend.global.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_session")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterviewSession extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id", nullable = false)
    private Member mentor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus status = SessionStatus.SCHEDULED;

    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    @Builder
    public InterviewSession(Member mentor, LocalDateTime scheduledAt) {
        this.mentor = mentor;
        this.scheduledAt = scheduledAt;
    }

    public void progressStatus() {
        if (this.status == SessionStatus.SCHEDULED) {
            this.status = SessionStatus.IN_PROGRESS;
        } else if (this.status == SessionStatus.IN_PROGRESS) {
            this.status = SessionStatus.COMPLETED;
        } else {
            throw new CustomException(ErrorCode.INVALID_SESSION_STATUS);
        }
    }
}
