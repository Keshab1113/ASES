import { useParams } from "react-router-dom";
import Teams from "./Teams";

const TeamManagement = ({ user }) => {
  const { groupId } = useParams();
  
  if (!groupId) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">No group selected. Please select a group first.</p>
      </div>
    );
  }
  
  return <Teams user={user} groupId={groupId} />;
};

export default TeamManagement;