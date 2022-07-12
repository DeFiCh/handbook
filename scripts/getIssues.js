fetch("https://api.github.com/repos/DeFiCh/ain/issues?labels=kind/fix")
  .then((res) => res.json())
  .then((data) => {
    var converter = new showdown.Converter();

    console.log(data);
    const table = document.getElementById("issues-body");

    data.forEach((item) => {
      let row = table.insertRow();

      let number = row.insertCell(0);
      let title = row.insertCell(1);
      let url = row.insertCell(2);

      number.innerHTML = item.number;
      title.innerHTML = converter.makeHtml(item.title);
      url.innerHTML = `<a href="${item.html_url}">#${item.number}</a>`;
    });
  });
