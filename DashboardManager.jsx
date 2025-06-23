import React, { useEffect, useState } from 'react';
import api from '../api';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';

function DashboardManager() {
  const [team, setTeam] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTeam = async () => {
      if (!token) return;

      try {
        const res = await api.get('/manager/team', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200 && Array.isArray(res.data)) {
          setTeam(res.data);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("Unauthorized. Possibly expired login.");
          localStorage.clear();
          window.location.href = '/';
        } else {
          console.error("Error fetching team:", err);
        }
      }
    };

    fetchTeam();
  }, [token]);

  const selectedEmployee = team.find((emp) => emp.id === selectedEmployeeId);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>👥 Manager Dashboard</h1>
        <button onClick={handleLogout} style={styles.logout}>⎋ Logout</button>
      </div>

      <div style={styles.teamSection}>
        <h2>Your Team</h2>
        <div style={styles.teamGrid}>
          {team.map((emp) => (
            <div
              key={emp.id}
              style={{
                ...styles.teamCard,
                border: selectedEmployeeId === emp.id ? '2px solid #3498db' : '1px solid #ccc',
              }}
              onClick={() => {
                setSelectedEmployeeId(emp.id);
                setEditingFeedback(null); // reset edit state when changing employee
              }}
            >
              <p style={styles.empName}>{emp.name}</p>
              <p style={styles.empEmail}>{emp.email}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedEmployeeId && (
        <div style={styles.feedbackSection}>
          <div style={styles.card}>
            <h3>📝 Submit Feedback for <span style={{ color: '#2c3e50' }}>{selectedEmployee?.name}</span></h3>
            <FeedbackForm
              employeeId={selectedEmployeeId}
              editingFeedback={editingFeedback}
              setEditingFeedback={setEditingFeedback}
            />
          </div>

          <div style={styles.card}>
            <h3>📜 Feedback History for <span style={{ color: '#2c3e50' }}>{selectedEmployee?.name}</span></h3>
            <FeedbackList
              employeeId={selectedEmployeeId}
              onEditFeedback={setEditingFeedback}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    color: '#2c3e50',
  },
  logout: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  teamSection: {
    marginBottom: '40px',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '10px',
  },
  teamCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease, border 0.2s ease',
    cursor: 'pointer',
  },
  empName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
  },
  empEmail: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: 0,
  },
  feedbackSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: '0.3s',
  },
};

export default DashboardManager;
