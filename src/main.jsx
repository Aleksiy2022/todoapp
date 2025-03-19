import {createRoot} from "react-dom/client";
import App from "./components/app/App.jsx";
import "./main.css"

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App/>)