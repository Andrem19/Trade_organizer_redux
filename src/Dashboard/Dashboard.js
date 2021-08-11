import React, {useEffect} from 'react'
import { connect } from 'react-redux';


const Dashboard = ({syncPosts}) => {

    return (
        <div>
          <div>
            <ul>
              {syncPosts.map(post => {
                return <li key={post.id}>{post.name}</li>
              })}
            </ul>
          </div>
        </div>
    )
}
const mapStateToProps = state => {
  return {
    syncPosts: state.posts.posts,
  }
}

export default connect(mapStateToProps, null)(Dashboard)
