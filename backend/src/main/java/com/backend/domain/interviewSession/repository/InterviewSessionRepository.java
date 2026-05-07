package com.backend.domain.interviewSession.repository;

import com.backend.domain.interviewSession.entity.InterviewSession;
import com.backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {

    List<InterviewSession> findAllByMentor(Member mentor);
}
