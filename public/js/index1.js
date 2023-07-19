function submitForm(e) {
  e.preventDefault();
  getData();
}

async function getData() {
  let userData = document.getElementById('input').value.trim();
  if (userData === '') return false;

  document.getElementById('messages').innerHTML =
    `<div class="mess-user">
    <h3>Ваш запрос принят...</h3> 
			<p>${userData}</p>
	</div>` + document.getElementById('messages').innerHTML;
  document.getElementById('input').value = '';

  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: userData }),
    });
    const data = await response.json();

    document.getElementById('messages').innerHTML =
      `<div class="mess-chat">
	<p>${data}</p>
</div>` + document.getElementById('messages').innerHTML;
  } catch (error) {
    console.error('Error:', error);
  }
}
