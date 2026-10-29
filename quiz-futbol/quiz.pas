program QuizFutbol;

var
  opcion: integer;
  resp: char;
  puntos: integer;

begin
  repeat
    writeln;
    writeln('===== QUIZ DE FUTBOL =====');
    writeln('1 - Copa Libertadores');
    writeln('2 - Liga Argentina');
    writeln('3 - Mundiales');
    writeln('4 - Salir');
    write('Elegi una tematica: ');
    readln(opcion);

    puntos := 0;

    case opcion of
      1: begin
           writeln;
           writeln('--- COPA LIBERTADORES ---');

           writeln('1) Que club gano mas Copas Libertadores?');
           writeln('   a) Boca   b) Independiente   c) Penarol');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'B' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Era Independiente.');

           writeln('2) Quien gano la final 2018 jugada en Madrid?');
           writeln('   a) River   b) Boca   c) Gremio');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'A' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Era River.');

           writeln('3) Que equipo gano la Libertadores 2023?');
           writeln('   a) Palmeiras   b) Flamengo   c) Fluminense');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'C' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Era Fluminense.');

           writeln('Sacaste ', puntos, ' de 3.');
         end;

      2: begin
           writeln;
           writeln('--- LIGA ARGENTINA ---');

           writeln('1) Que club tiene mas titulos de liga en Argentina?');
           writeln('   a) Boca   b) River   c) Racing');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'B' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Era River.');

           writeln('2) Quienes juegan el clasico de Avellaneda?');
           writeln('   a) Racing e Independiente   b) Lanus y Banfield   c) Boca y River');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'A' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Eran Racing e Independiente.');

           writeln('3) A que equipo le dicen "El Ciclon"?');
           writeln('   a) Huracan   b) Velez   c) San Lorenzo');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'C' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Era San Lorenzo.');

           writeln('Sacaste ', puntos, ' de 3.');
         end;

      3: begin
           writeln;
           writeln('--- MUNDIALES ---');

           writeln('1) Cuantos mundiales gano Argentina?');
           writeln('   a) 2   b) 3   c) 4');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'B' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Son 3 (1978, 1986 y 2022).');

           writeln('2) Donde se jugo el Mundial 2022?');
           writeln('   a) Rusia   b) Brasil   c) Qatar');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'C' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Fue en Qatar.');

           writeln('3) Que seleccion gano mas mundiales?');
           writeln('   a) Brasil   b) Alemania   c) Italia');
           write('Respuesta: ');
           readln(resp);
           if upcase(resp) = 'A' then
           begin
             writeln('Correcto!');
             puntos := puntos + 1;
           end
           else
             writeln('Incorrecto. Es Brasil, con 5.');

           writeln('Sacaste ', puntos, ' de 3.');
         end;

      4: writeln('Chau!');
    else
      writeln('Opcion invalida.');
    end;
  until opcion = 4;
end.
