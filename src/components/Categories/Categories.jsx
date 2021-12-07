import './Categories.css'

const Categories = (props) => {

    const { text, img } = props
    
    const style  = {
        backgroundImage: 'url('+ `${img}` + ')',
        backgroundSize: 'cover',
    }

    return(
          <div className="Categories d-flex align-items-end" style={style}>

            <button type="button" data-toggle="modal" data-target="#exampleModal">
                <p className=" m-2 text-white font-weight-bold">{text}</p>
            </button>
                        
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{text}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                </div>
            </div>
            </div>
          </div>
    )
}

export default Categories