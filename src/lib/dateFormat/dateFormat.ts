const formatDate = (date:Date) => {
    const options:Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    
    return new Date(date).toLocaleString('en-US', options);
};

export default formatDate;