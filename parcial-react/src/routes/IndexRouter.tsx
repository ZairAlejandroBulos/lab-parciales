import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import TableArticulo from "../components/TableArticulo";

function IndexRouter(): JSX.Element {
    return(
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<TableArticulo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default IndexRouter;