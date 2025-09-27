import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Tag } from "tabler-icons-react";

interface AdminPanelProps {
    collapsed: boolean;
}
const AdminPanel: React.FC<AdminPanelProps> = ({ collapsed }) => {
    return (
        <>
            <MenuItem component={<Link to="/cupones" />}>
                <Tag /> {!collapsed && <span>Cupones</span>}
            </MenuItem>
        </>
    );
}
export default AdminPanel;