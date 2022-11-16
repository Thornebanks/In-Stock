import './DeleteModal.scss';
import Button from '../Button/Button';

export default function DeleteModal({type, item, cancelHandler, deleteHandler}) {
    let title, body;
    if (type === 'inventory') {
        title = `Delete ${item} inventory item?`;
        body = `Please confirm that you'd like to delete ${item} from the inventory list. You won't be able to undo this action.`;
    } else if (type === 'warehouse') {
        title = `Delete ${item} warehouse?`;
        body = `Please confirm that you'd like to delete the ${item} from the list of warehouses. You won't be able to undo this action.`;
    }

    return (
        <div className="overlay">
            <div className="modal">
                <span className="material-icons modal__close" onClick={cancelHandler}>close</span>
                <h1 className="modal__title">{title}</h1>
                <p className="modal__body">{body}</p>
                <div className="modal__btns">
                    <Button btnType="secondary" text="Cancel" clickHandler={cancelHandler}/>
                    <Button btnType="delete" text="Delete" clickHandler={deleteHandler}/>
                </div>
            </div>
        </div>

    );
}