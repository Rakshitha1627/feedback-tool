import React, { useState } from 'react';
import api from '../api';

function FeedbackForm({ employeeId, isEmployeeGiving = false }) {
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [sentiment, setSentiment] = useState('positive');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setLoading(true);

    try {
      // Determine who we're sending feedback to
      let targetId = isEmployeeGiving
        ? localStorage.getItem('manager_id') || 1  // fallback for testing
        : employeeId;

      // Build endpoint WITHOUT the extra /api prefix
      const endpoint = isEmployeeGiving
        ? `/employee/feedback/${targetId}`
        : `/manager/feedback/${targetId}`;

      const res = await api.post(
        endpoint,
        { strengths, improvements, sentiment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 201) {
        setStatusMsg('✅ Feedback submitted successfully!');
        setStrengths('');
        setImprovements('');
        setSentiment('positive');
      } else {
        throw new Error(`Unexpected status: ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      setStatusMsg(
        `❌ Failed to submit feedback (${err.response?.status || 'Network Error'})`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {statusMsg && <p style={styles.status}>{statusMsg}</p>}

      <textarea
        placeholder="💪 Strengths"
        value={strengths}
        onChange={(e) => setStrengths(e.target.value)}
        required
        style={styles.input}
      />
      <textarea
        placeholder="🛠️ Areas to Improve"
        value={improvements}
        onChange={(e) => setImprovements(e.target.value)}
        required
        style={styles.input}
      />
      <label style={styles.label}>
        Sentiment:
        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          style={styles.select}
        >
          <option value="positive">😊 Positive</option>
          <option value="neutral">😐 Neutral</option>
          <option value="negative">😞 Negative</option>
        </select>
      </label>

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '10px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '80px',
    transition: 'all 0.2s ease-in-out',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  select: {
    marginLeft: '10px',
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    marginTop: '10px',
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  },
  status: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#2c3e50',
    backgroundColor: '#ecf0f1',
    padding: '8px',
    borderRadius: '6px',
  },
};

export default FeedbackForm;
