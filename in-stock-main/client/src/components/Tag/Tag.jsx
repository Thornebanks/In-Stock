import './Tag.scss';

// just needs the text and true/false value for isGreen for styling as props
export default function Tag({isGreen, text}) {
    return (
        <h4 className={'tag' + (isGreen ? ' tag--green' : ' tag--red')}>{text}</h4>
    );
}