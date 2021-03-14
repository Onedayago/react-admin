import React, {useState} from 'react'
import {Checkbox, Tag} from "antd";
import {homeBtns} from "../View/Home";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Action from "../reducer/action";

const { CheckableTag } = Tag;


const MenuBtnList =(props)=>{

  const [selectedTags, setSelectedTags] = useState([])

  const [checkRoute, setCheckRoute] = useState(false)

  const handleChange=(tag, checked) =>{

    if(!checkRoute){
      alert('请先勾选路由')
      return false;
    }
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);

    setSelectedTags(nextSelectedTags)

    props.changeBtn({
      add: checked,
      btn: `${props.route}/${tag}`,
      route: props.route
    })
  }

  const onChange=(e)=>{
    props.changeRoute({
      add: e.target.checked,
      route: props.route
    })

    setCheckRoute(e.target.checked)
    setSelectedTags([])
  }

  return(
    <div>
      <Checkbox onChange={onChange}>{props.name}:</Checkbox>

      {Object.keys(props.btn).map(item => {

          let key = props.btn[item].key
          let value = props.btn[item].value
          return(
            <CheckableTag
              key={key}
              checked={selectedTags.indexOf(key) > -1}
              onChange={checked => handleChange(key, checked)}
            >
              {value}
            </CheckableTag>
          )
        }
      )}
    </div>
  )
}

MenuBtnList.defaultProps = {
  name: '',
  route: '',
  btn: {},
  changeRoute: ()=>{},
  changeBtn: ()=>{},


}

MenuBtnList.propTypes = {
  name: PropTypes.string,
  route: PropTypes.string,
  btn: PropTypes.object,
  changeRoute: PropTypes.func,
  changeBtn: PropTypes.func
}


const mapStateToProps = (state, ownProps) => {
  return {
    menu: state.UserReducer.menu
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addRole: (role)=>dispatch(Action.addRole(role)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MenuBtnList)
