import React, { Component } from 'react';
import './NoteApp.css';

class Note extends Component{
    render (){
       let style = {background: this.props.color};
       return(
          <div className="note" style={style}>
              <span className="delete-note" onClick={this.props.onDelete}> x </span>
              {this.props.children}
          </div>
        )
    }
}

class NoteEditor extends Component{
    constructor(props){
        super(props);
        this.handleNoteAdds = this.handleNoteAdds.bind(this);
        this.state = {
            text: ""
        };
    }

    handleTextChange(event){
        this.setState({text: event.target.value});
    }

    handleNoteAdds(){
        let newNote = {
            text: this.state.text,
            color: 'yellow',
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({text: ''})
    }

    render () {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here ..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
                />
                <button className="add-button" onClick={this.handleNoteAdds.bind(this)}>Add</button>
            </div>
        )
    }
}

class NotesGrid extends Component{
    render() {
        let onNoteDelete = this.props.onNoteDelete;

        return(
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function (note) {
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color} >
                                {note.text}
                            </Note>
                        )
                    })
                }
            </div>
        )
    }
}

class NoteApp extends Component{
    constructor(props){
        super(props);
        this.state ={
            notes: [{
                id: 0,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium felis eu aliquet gravida. Nunc congue mauris eros, in sagittis nunc tempus id. Nam consequat nunc vitae ex aliquam congue in et velit. Pellentesque tellus orci, dapibus ac rhoncus et, luctus nec sem. Aliquam ut ex id nisi congue rutrum blandit sed ligula. Nullam metus neque, efficitur nec libero vitae, volutpat interdum est. Suspendisse eget aliquam nibh, id varius lectus. Donec dignissim, sapien at iaculis luctus, lectus nibh lacinia tellus, eu accumsan tellus nisi non lectus.",
                color: "#FFD700"
            },{
                id: 1,
                text: "Morbi tortor orci, pretium vitae sapien nec, mattis ullamcorper magna. Vestibulum nec lectus justo. Fusce id mattis arcu. In ut lectus ipsum. Suspendisse euismod pretium elit, facilisis pellentesque tellus tempus a. Aliquam congue sapien ultricies mauris fermentum, et pellentesque mauris hendrerit. Sed bibendum leo quis varius faucibus. Integer consequat interdum diam, a maximus lacus ullamcorper quis. Aliquam venenatis feugiat orci a faucibus. Aliquam ipsum nulla, dictum in lectus hendrerit, pulvinar pulvinar mauris.",
                color: "#20B2AA"
            },{
                id: 3,
                text: "Etiam dapibus vestibulum ligula, vel commodo leo. Sed iaculis est sed leo dapibus interdum. In a mi at diam commodo venenatis at sit amet libero. Integer at sapien vel nibh tempor varius. Donec ac auctor enim. Suspendisse et urna quam. Donec lacinia quis erat vel vehicula. Mauris fermentum pellentesque quam, in fermentum turpis mollis at. Nunc dignissim vitae elit sed tincidunt. Curabitur sagittis tempus sagittis. Etiam eget pulvinar orci, quis porttitor purus.",
                color: "#90EE90"
            },{
                id: 4,
                text: "Integer et iaculis nisl. Morbi mollis felis id laoreet fringilla. Suspendisse non porta magna, nec consequat eros. Nullam vel porta dui. Pellentesque bibendum maximus magna at rutrum. Suspendisse cursus eget massa vel gravida. Fusce finibus sed tellus luctus gravida. Vivamus hendrerit augue velit, nec scelerisque leo luctus a.",
                color: "#87CEFA"
            },{
                id: 5,
                text: "Suspendisse faucibus nisi sodales sollicitudin feugiat. In vel ipsum accumsan, cursus dui vitae, tincidunt massa. Sed et dictum purus, vitae tempor libero. Vestibulum semper leo et mi varius imperdiet. In at ipsum porta, hendrerit sapien quis, fermentum erat. Maecenas dignissim enim non ultrices laoreet. In eros risus, pretium nec malesuada bibendum, finibus ac sapien. Maecenas tristique quam eros, eu porttitor ex pulvinar ac. Fusce elementum turpis vitae auctor egestas. Sed vehicula ipsum sed felis tempus gravida. Cras tempor metus at lectus varius ornare. Etiam efficitur arcu eu magna facilisis euismod. Praesent diam tortor, rhoncus sed odio id, accumsan semper libero. Vivamus odio sem, cursus sit amet feugiat accumsan, tempor eget nulla. In hac habitasse platea dictumst. Vestibulum in ante metus.",
                color: "#5F9EA0"
            },{
                id: 6,
                text: "Duis nec sem consequat, gravida tellus non, ornare lacus. Donec orci ex, facilisis et facilisis et, eleifend sit amet lacus. Proin dapibus auctor ipsum vel pretium. Duis eget ipsum non metus tempor eleifend sed hendrerit lacus. Etiam et metus aliquet, finibus nunc sit amet, pellentesque arcu. Nullam condimentum consectetur quam in malesuada. Pellentesque id luctus tellus. Phasellus et egestas ante. Praesent vulputate odio ut nulla tincidunt, ut sodales elit faucibus. Phasellus vel semper nunc, ut accumsan arcu. Duis eget libero vitae risus luctus gravida interdum ut purus. Praesent convallis, enim vitae interdum lacinia, libero erat vehicula ante, eu pellentesque mauris magna quis sapien. Nulla mi nisl, interdum ac rhoncus vitae, consectetur nec nibh. Vestibulum ut tincidunt ipsum.",
                color: "#FFA07A"
            }]
        }
    }

    componentDidMount() {
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes){
            this.setState({notes: localNotes});
        }
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    handleNoteDelete(note){
        let noteId = note.id;
        let newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });
        this.setState({notes: newNotes});
    }

    handleNoteAdd(newNote){
        let newNotes = this.state.notes.splice();
        newNotes.unshift(newNote);
        this.setState({notes: newNotes})
    }

    render() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd.bind(this)} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete.bind(this)}/>
            </div>
        );
    }

    _updateLocalStorage() {
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes)
    }
}

export default NoteApp;