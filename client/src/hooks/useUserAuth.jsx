import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance  from "../Utils/axiosinstance";
import { API_PATHS } from "../Utils/apiPath";

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    //voice part
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(()=>{
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error){
                console.error("Failed to fetch user info:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
            }


        }
    }
            fetchUserInfo();
        }, []);
    
    // 🎙️ Voice Recognition Initialization
        useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please try Google Chrome or Firefox.');
            return;
        }

        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.continuous = false;        

        if ('webkitSpeechGrammarList' in window) {
            const grammar = '#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;';
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }


        recognition.onresult = (event) => {
            let text = '';
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        return () => {
            recognition.stop();
        };
    }, []);
    
    // 🔊 Start/Stop Voice Listening
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return {
        user,
        isListening,
        transcript,
        startListening,
        stopListening,
    };
}

export default useUserAuth;