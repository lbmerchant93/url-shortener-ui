import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map(url => {
    return (
      <div key={url.id} className="url">
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button id={url.id} onClick={(event) => props.removeUrl(event.target.id)} className="delete">DELETE</button>
      </div>
    )
  });

  return (
    <section>
      { props.errorMsg && <p>{props.errorMsg}</p>}
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
