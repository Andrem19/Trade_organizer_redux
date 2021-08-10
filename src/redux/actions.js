import {CREATE_POST, DELETE_POST} from './types'

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  }
}
export function deletePost(key) {
  return {
    type: DELETE_POST,
    payload: key
  }
}
