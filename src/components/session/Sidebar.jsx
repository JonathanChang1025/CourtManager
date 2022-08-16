import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { GiShuttlecock } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { MdApproval } from "react-icons/md";
import { AiOutlineUserAdd, AiFillSwitcher } from "react-icons/ai";

function Sidebar(props) {

  const showLogoutModal = () => {
		props.setShowLogoutModal(true);
	}

  return (
    <div className="flex-grow" style={{height: "100vh"}}>
      <ProSidebar
        className="mr-3 h-100"
        collapsed="true"
      >
        <SidebarContent>
          <Menu iconShape="round">
            <MenuItem icon={<GiShuttlecock/>} >
              Home
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem icon={<MdApproval/>} >
              Awaiting Approval
            </MenuItem>
            <MenuItem icon={<AiOutlineUserAdd/>} >
              Add Guest
            </MenuItem>
            <MenuItem icon={<AiFillSwitcher/>} >
              Toggle Mode
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem icon={<FiLogOut/>} onClick={showLogoutModal}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Test
            </span>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  )
}

export default Sidebar;