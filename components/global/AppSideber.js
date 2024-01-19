import Tree from '../global/Tree';
// import AppMenu from './AppMenu';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { MenuProvider } from './context/menucontext';

const AppSidebar = () => {
        return <ProSidebar>
                    <Tree></Tree>
                </ProSidebar>;
    
    // return <AppMenu></AppMenu>;
    // return <Tree/>
};

export default AppSidebar;
