import { useState } from "react";
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { GiShuttlecock } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { MdApproval } from "react-icons/md";
import { AiOutlineUserAdd, AiFillSwitcher } from "react-icons/ai";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";

function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  const showLogoutModal = () => {
		props.setShowLogoutModal(true);
	}

  const unapprovedPlayersCount = props.playerList.filter(player => {
    if (!player.approved) {
      return true;
    }
    return false;
  }).length;

  return (
    <div className="flex-grow" style={{height: "100vh"}}>
      <ProSidebar
        className="mr-3 h-100"
        collapsed={collapsed}
      >
        <SidebarContent>
          <Menu iconShape="round">
            <MenuItem icon={<GiShuttlecock/>} >
              Home
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdApproval/>}
              suffix={<span className="badge badge-warning badge-pill">{unapprovedPlayersCount}</span>}
            >
              Awaiting Approval
            </MenuItem>
            <MenuItem icon={<AiOutlineUserAdd/>} >
              Add Guest
            </MenuItem>
            <MenuItem icon={<AiFillSwitcher/>} >
              Toggle Mode
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
        <Menu iconShape="circle">
            <MenuItem
              icon={
                collapsed ?
                <TbLayoutSidebarRightCollapse/> :
                <TbLayoutSidebarLeftCollapse/>
              }
              onClick={toggleCollapsed}
            >
              Collapse Sidebar
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem icon={<FiLogOut/>} onClick={showLogoutModal}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  )
}

export default Sidebar;