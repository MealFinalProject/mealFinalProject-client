import './Categories.css'

const Categories = (props) => {

    const { text, img } = props

    const style  = {}

    return(
          <div className="Categories d-flex align-items-end" style={}>
            <p className="text-center">{text}</p>
          </div>
    )
}

export default Categories