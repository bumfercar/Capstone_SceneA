package com.backend.domain.interviewAnswer.entity;

import com.backend.domain.interviewQuestion.entity.InterviewQuestion;
import com.backend.domain.member.entity.Member;
import com.backend.global.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interview_answer")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterviewAnswer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private InterviewQuestion interviewQuestion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String audioUrl;

    private Float aiScore;

    private Float mentorScore;

    private Float gap;

    @Builder
    public InterviewAnswer(InterviewQuestion interviewQuestion, Member member, String audioUrl) {
        this.interviewQuestion = interviewQuestion;
        this.member = member;
        this.audioUrl = audioUrl;
    }

    public void updateAiScore(Float aiScore) {
        this.aiScore = aiScore;
    }

    public void updateMentorScore(Float mentorScore) {
        this.mentorScore = mentorScore;
        if (this.aiScore != null) {
            this.gap = Math.abs(this.aiScore - mentorScore);
        }
    }
}
