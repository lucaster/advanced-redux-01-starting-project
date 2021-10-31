import classes from './Notification.module.css';

const Notification = ({ status, title, message }) => {

  const specialClasses = calcSpecialClasses(status);

  function calcSpecialClasses(status) {
    switch (status) {
      case 'error':
        return classes.error;
      case 'success':
        return classes.success;
      default:
        return '';
    }
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
