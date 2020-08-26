import React from'react'
import styles from './input.module.scss'

const input = (props) =>{
    let inputElement = null
    let classes = [styles.input]
    if (!props.valid && props.touched) {
        classes.push(styles.invalid)
    }
    switch(props.inputtype){
        case ('input'):
            inputElement = <input className={classes.join(' ')} onChange={props.changed} {...props} />
            break
        case ('textArea'):
            inputElement = <textarea className={styles.textArea}  onChange={props.changed} {...props}></textarea>
            break
        default:
            inputElement = <input className={styles.input} onChange={props.changed} {...props}/>
    }
    return(
        <div>
            <label className={styles.label}></label>
            {inputElement}
        </div>
    )
}

export default input