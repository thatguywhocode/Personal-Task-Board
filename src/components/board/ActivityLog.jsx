import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";

function ActivityLog() {
  const { activityLog } = useContext(BoardContext);

  return (
  <div className="activity-log">
    <h3>Recent Activity</h3>

    {activityLog.length === 0 ? (
      <div className="empty-log-container">
        <p className="empty-log">No activity yet</p>
      </div>
    ) : (
      <ul>
        {activityLog.slice(0, 10).map((log, index) => (
          <li key={index} className="log-item">
            <div className="log-message">{log.message}</div>
            <div className="log-time">
              {log.time ? new Date(log.time).toLocaleString() : ""}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

}

export default ActivityLog;
