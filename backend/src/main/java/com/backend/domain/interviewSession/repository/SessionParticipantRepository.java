package com.backend.domain.interviewSession.repository;

import com.backend.domain.interviewSession.entity.InterviewSession;
import com.backend.domain.interviewSession.entity.SessionParticipant;
import com.backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionParticipantRepository extends JpaRepository<SessionParticipant, Long> {

    List<SessionParticipant> findAllByInterviewSession(InterviewSession interviewSession);

    List<SessionParticipant> findAllByMember(Member member);

    Optional<SessionParticipant> findByInterviewSessionAndMember(InterviewSession interviewSession, Member member);
}
