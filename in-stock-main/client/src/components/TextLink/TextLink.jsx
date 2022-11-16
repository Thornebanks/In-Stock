import {Link} from 'react-router-dom';
import './TextLink.scss'
import NextIcon from '../../assets/Icons/chevron_right-24px.svg';

// just needs the text and url for the href as props
export default function TextLink({text, href}) {
    return (
        <Link className="text-link" to={href}>
            <span className="text-link__text body-medium">{text}</span>
            <img className="text-link__icon" src={NextIcon} alt="next arrow"/>
        </Link>
    )
}