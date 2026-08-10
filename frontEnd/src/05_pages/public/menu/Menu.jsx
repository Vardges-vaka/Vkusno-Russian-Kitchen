import { PublicHeader, PublicFooter } from "../_shared_comps/_public.shared_comps.index.js";


const Menu = () => {
    return (
        <div className="menu">
            <PublicHeader />
            <div className="menu-content">
                <h1>Menu</h1>
            </div>
            <PublicFooter />
        </div>
    )
}

export default Menu;