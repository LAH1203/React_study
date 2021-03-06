import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id=3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: {title: 'WEB', sub: 'world wide web!'},
      welcome: {title: 'Welcome', desc: 'Hello, React!!'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) { 
          return data;
         // break;
        }
        i++;
      }

  }
  getContent(){
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>
    }
    else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title = {_content.title} desc = {_content.desc}></ReadContent>
      
    } else if (this.state.mode === 'create') {
      _article= <CreateContent onSubmit={function(_title,_desc){
        // add content to this.state.contents
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title: _title, desc: _desc}
        )
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }
    else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article= <UpdateContent data = {_content} onSubmit={function(_id, _title,_desc){
        // add content to this.state.contents
        var _contents = Array.from(this.state.contents); // 복사한 새로운 배열 만들기
        var i = 0;
        while ( i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id:_id, title: _title, desc:_desc};
            break;
          }
          i++;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });

      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    
    return (
      <div className="App">
          <Subject 
            title={this.state.subject.title} 
            sub={this.state.subject.sub}
            onChangePage= {function(){
              this.setState({mode:'welcome'});
              //alert('hi');
            }.bind(this)}
            >
          </Subject>
 
        <TOC onChangePage={function(id){
          //alert('hi');
          this.setState({
            mode: 'read',
            selected_content_id: Number(id) // String을 숫자로 바꾸기
          });
        }.bind(this)}data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')) {
              var _contents = Array.from(this.state.contents)
              var i = 0;
              while (i < _contents.length) {
                if(_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
              this.setState ({
                mode: 'welcome',
                contents: _contents,
              });
              alert('delete!');
            }
          } else {
            this.setState({
              mode:_mode // 현재 상태에 따라 mode 변경하기
            });
          }
          
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
