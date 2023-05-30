export const ProductSearch = ({ setterFunction }) => {
    return (
        <div className="form-group">
            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" className="form-control" placeholder="What candy are you looking for?" />
        </div>
    )
}