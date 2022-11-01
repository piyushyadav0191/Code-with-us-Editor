import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Main/Home';
import EditorPage from './pages/Editor/EditorPage';
import Navbar from './components/Navbar/Navbar'
import Contact from './components/Contact/Contact';
import MarkupEditor from './pages/Markup/MarkupEditor';
import { TitleContext } from './context/TitleContext';

function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/editor/:roomId"
                        element={<EditorPage />}
                    ></Route>
                    <Route path='/markup-editor' element={<MarkupEditor />}  />
                <Route path='/contact' element={<Contact />} />
                </Routes>
            </BrowserRouter>
           
        </>
    );
}

export default App;
