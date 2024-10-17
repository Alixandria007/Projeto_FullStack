import './styles.css'

export const ConfirmScreen = ({isOpen, onClose, onConfirm, text} ) => {
    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Confirmar Deleção</h2>
                <p>{text}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="btn btn-danger">Deletar</button>
                    <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
                </div>
            </div>
        </div>
    );

}