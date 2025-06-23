import React, { useEffect, useState } from 'react';
import api from '../api';
import FeedbackForm from './FeedbackForm';

function DashboardEmployee() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [managerId, setManagerId] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

useEffect(() => {
  const fetchFeedback = async () => {
    if (!token || !userId) return;

    try {
      const res = await api.get(`/employee/feedback/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && Array.isArray(res.data)) {
        setFeedbacks(res.data);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        // No feedback found is not an error
        setFeedbacks([]);
      } else if (err.response?.status === 401) {
        console.warn("Unauthorized. Possibly expired login.");
        localStorage.clear();
        window.location.href = '/';
      } else {
        console.error("Fetch error:", err);
        // optional: show alert only for true failures
        // alert("❌ Failed to fetch feedback");
      }
    }
  };

  fetchFeedback();
}, [token, userId]);


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>🙋 Employee Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>✍️ Give Feedback to Your Manager</h3>
        <input
          type="number"
          placeholder="Manager ID"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          style={styles.input}
        />
        <FeedbackForm employeeId={managerId} isEmployeeGiving={true} />
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>📜 Feedback You Received</h3>
        {feedbacks.length === 0 ? (
          <p>No feedback received yet.</p>
        ) : (
          <div style={styles.feedbackList}>
            {feedbacks.map((feedback) => (
              <div key={feedback.id} style={styles.feedbackItem}>
                <h4>📝 Feedback #{feedback.id}</h4>
                <p><strong>Strengths:</strong> {feedback.strengths}</p>
                <p><strong>Areas to Improve:</strong> {feedback.improvements}</p>
                <p><strong>Sentiment:</strong> {feedback.sentiment}</p>
                <p><strong>Timestamp:</strong> {new Date(feedback.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '850px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fefefe',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '26px',
    color: '#333',
  },
  logoutButton: {
    padding: '8px 14px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  section: {
    marginTop: '30px',
  },
  subheading: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#444',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  feedbackList: {
    marginTop: '20px',
  },
  feedbackItem: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default DashboardEmployee;
