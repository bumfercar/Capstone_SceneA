import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MentorDashboard from './pages/Mentor/MentorDashboard'
import MenteeDashboard from './pages/Mentee/MenteeDashboard'
import MentorInfoRegister from './pages/Mentor/MentorRegister'
import MentorSearch from './pages/Mentee/MentorSearch'
import MentorApply from './pages/Mentee/MentorApply'
import DocumentUpload from './pages/Mentee/DocumentUpload'
import InterviewSession from './pages/Interview/InterviewSession'
import InterviewRobby from './pages/Interview/InterviewLobby'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/dashboard/mentor" element={<MentorDashboard />} />
      <Route path="/dashboard/mentee" element={<MenteeDashboard />} />
      <Route path="/mentor/register" element={<MentorInfoRegister />} />
      <Route path="/mentor/search" element={<MentorSearch />} />
      <Route path="/mentor/apply/:id" element={<MentorApply />} />
      <Route path="/mentee/documents" element={<DocumentUpload />} />
      <Route path="/interview/ready/:id" element={<InterviewRobby role="mentee" />} />
      <Route path="/interview/ready-mentor/:id" element={<InterviewRobby role="mentor" />} />
      <Route path="/interview/mentee/:id" element={<InterviewSession role="mentee" />} />
      <Route path="/interview/mentor/:id" element={<InterviewSession role="mentor" />} />
    </Routes>
  )
}
