

function Repo (props){
    return(
        <div className="repo__container">
            <img className="repo__avatar" alt="Avatar" src={props.repo_data.owner.avatar_url}/>
            <div className="repo__body">
                <h2>{props.repo_data.name}</h2>
                <p>{props.repo_data.description}</p>
                <div className="repo__status">
                    <span className="bordered">stars: {props.repo_data.stargazers_count}</span>
                    <span className="bordered">issues: {props.repo_data.open_issues_count}</span>
                    <span>submitted at {props.repo_data.updated_at} by {props.repo_data.owner.login}</span>
                </div>
            </div>
        </div>
    )
}

export default Repo;