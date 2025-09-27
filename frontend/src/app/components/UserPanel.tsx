import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Tag } from "tabler-icons-react";

interface UserPanelProps {
    collapsed: boolean;
}
const UserPanel: React.FC<UserPanelProps> = ({ collapsed }) => {
    return (
        <>
            <MenuItem component={<Link to="/cuponesUser" />}>
                <Tag /> {!collapsed && <span>Cupones</span>}
            </MenuItem>
        </>
    );
}
export default UserPanel;