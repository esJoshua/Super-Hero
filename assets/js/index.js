$(document).ready(() => {
  $("#formUser").on("submit", function (e) {
    e.preventDefault();
    //console.log("probando jquery");
    
    const inputValue = $.trim($("#userNumber").val());
    //console.log(inputValue);
    if (isNaN(inputValue)) alert("Solo carácteres Numéricos");

    const headerContainer = $("#headerContainer");
    const heroData = $("#heroData");

    const baseURL =
      "https://akabab.github.io/superhero-api/api/id/" + inputValue + ".json";

    $.ajax({
      // Endpoint API
      url: baseURL,
      type: "GET",
      dataType: "JSON",
      statusCode: {
        404: () => {
          headerContainer.show();
          alert("SuperHero no encontrado, intenta con otro número");
          heroData.hide();
        },
      },
      success: (data) => {
        headerContainer.hide();
        heroData.show();

        // Datos de la card //
        const heroFullData = data;
        const nameHero = data.name;
        const imgHero = data.images.lg;
        console.log(heroFullData);
        //console.log(nameHero);
        const connections = data.connections.groupAffiliation;
        const publisher = data.biography.publisher;
        const occupation = data.work.occupation;
        const firstAppearance = data.biography.firstAppearance;
        const height = data.appearance.height;
        //console.log(height)
        const heightJoin = height.join(" - ");
        //console.log(heightJoin)
        const weight = data.appearance.weight;
        const weightJoin = weight.join(" - ");
        const aliases = data.biography.aliases;
        const aliasesJoin = aliases.join(", ");

        $("#cardHero").html(`
                    <h3 class="text-center mb-3">SuperHero encontrado</h3>
                    <div class="card mb-3 g-0">
                        <div class="row">
                          <div class="col-12 col-md-5 gy-0">
                            <img class="card-img-top" src="${imgHero}" alt="${nameHero}">
                          </div>
                          <div class="col-12 col-md-7 g-0">
                            <div class="card-body">
                              <h4 class="card-title text-center"><strong>${nameHero}</strong></h4>
                              <p class="card-text"><strong>Conexiones:</strong></br>
                              ${connections}
                              </p>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Ocupación:</strong> ${occupation}</li>
                                <li class="list-group-item"><strong>Primera Aparición:</strong> ${firstAppearance}</li>
                                <li class="list-group-item"><strong>Altura:</strong> ${heightJoin}</li>
                                <li class="list-group-item"><strong>Peso:</strong> ${weightJoin}</li>
                                <li class="list-group-item"><strong>Alianzas:</strong> ${aliasesJoin}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="card-footer text-center">
                            Publicado por: ${publisher}
                        </div>
                    </div>
                    `);

        // Datos para la gráfica //
        const graphicHero = $("#graphicHero");
        const powerstats = data.powerstats;
        const intelligence = powerstats.intelligence;
        const strength = powerstats.strength;
        const speed = powerstats.speed;
        const durability = powerstats.durability;
        const power = powerstats.power;
        const combat = powerstats.combat;
        console.log(powerstats);
        console.log(speed);

        var options = {
          title: {
            backgroundColor: "black",
            fontWeight: "normal",
            fontColor: "white",
            fontStyle: "italic",
            borderColor: "red",
            padding: 7,
            borderThickness: 4,
            animationEnabled: true,
            exportEnabled: true,
            text: `Estadísticas de poder`,
          },
          legend: {
            horizontalAlign: "center",
            verticalAlign: "bottom",
            color: "green",
          },
          data: [
            {
              type: "pie",
              sstartAngle: 25,
              toolTipContent: "<b>{label}</b>: ({y})",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - ({y})",
              dataPoints: [
                { y: intelligence, label: "Inteligencia" },
                { y: strength, label: "Fuerza" },
                { y: speed, label: "Velocidad" },
                { y: durability, label: "Durabilidad" },
                { y: power, label: "Poder" },
                { y: combat, label: "Combate" },
              ],
            },
          ],
        };
        console.log($("#graphicHero"));
        graphicHero.CanvasJSChart(options);
      },
    });
  });
});
