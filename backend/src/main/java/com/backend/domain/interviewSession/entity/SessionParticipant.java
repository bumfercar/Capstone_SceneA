package com.backend.domain.interviewSession.entity;

import com.backend.domain.member.entity.Member;
import com.backend.global.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "session_participant")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SessionParticipant extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private InterviewSession interviewSession;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnswerStatus answerStatus = AnswerStatus.WAITING;

    @Builder
    public SessionParticipant(InterviewSession interviewSession, Member member) {
        this.interviewSession = interviewSession;
        this.member = member;
    }

    public void updateAnswerStatus(AnswerStatus answerStatus) {
        this.answerStatus = answerStatus;
    }
}
