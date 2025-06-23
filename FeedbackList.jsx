import React, { useEffect, useState } from 'react';
import api from '../api';

function FeedbackList({ employeeId, onEditFeedback, isEmployeeViewing = false }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const endpoint = isEmployeeViewing
          ? `/api/employee/feedback/${employeeId}`
          : `/api/manager/feedback/${employeeId}`;
        const res = await api.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to fetch feedbacks', err);
      }
    };
    fetchFeedbacks();
  }, [employeeId, isEmployeeViewing, token]);

  return (
    <div>
      {feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} style={styles.feedbackItem}>
            <h4>📝 Feedback {fb.id}</h4>
            <p><strong>Strengths:</strong> {fb.strengths}</p>
            <p><strong>Areas to Improve:</strong> {fb.improvements}</p>
            <p><strong>Sentiment:</strong> {fb.sentiment}</p>
            <p><strong>Timestamp:</strong> {new Date(fb.timestamp).toLocaleString()}</p>
            {typeof fb.acknowledged !== 'undefined' && (
              <p><strong>Acknowledged:</strong> {fb.acknowledged ? 'Yes' : 'No'}</p>
            )}
            {onEditFeedback && (
              <button
                style={styles.editBtn}
                onClick={() => onEditFeedback(fb)}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  feedbackItem: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  editBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    padding: '6px 10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default FeedbackList;
