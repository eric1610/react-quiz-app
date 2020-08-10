import styled, {createGlobalStyle} from 'styled-components';
import image from './images/unsplash.jpg';

export const Style = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-image: url(${image})
        background-size: cover;
        margin: 0;
        padding: 0 20 px;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Noto Sans JP', 'Lora', sans-serif;
    }
`