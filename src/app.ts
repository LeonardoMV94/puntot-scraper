import { chromium } from 'playwright';
import config from './config';

(async ()=> {
    const browser = await chromium.launch({
        headless: false,  
    });

    const url = config.url!;  
    const timeout = (1000 * 60) * +config.tiempoEspera!;  
   
    const cantidadVentanas = +config.cantidadVentanas!;
    
    const windowPromises = Array.from({ length: cantidadVentanas }, (_, i) => {
        return (async () => {
            const context = await browser.newContext();  
            const page = await context.newPage();  
            await page.goto(url);  
            console.log(`Ventana ${i + 1} abierta con contexto aislado`);

            try {
                
                const bancoChileButtonSelector = 'div.button-block a img[src*="BOTON-BANCHILE-min.png"]';
                await page.waitForSelector(bancoChileButtonSelector, { state: 'visible', timeout });
                await page.click(bancoChileButtonSelector);
                
                const usernameSelector = 'input[type="text"]#username';
                await page.waitForSelector(usernameSelector, { state: 'visible', timeout });
                await page.fill(usernameSelector, config.ptUsuario!);
               
                const passwordSelector = 'input[type="password"]#password';
                await page.waitForSelector(passwordSelector, { state: 'visible', timeout });
                await page.fill(passwordSelector, config.ptPassword!);

                const loginButtonSelector = 'button#btn-login';
                await page.waitForSelector(loginButtonSelector, { state: 'visible', timeout });
                await page.click(loginButtonSelector);
                console.log('Formulario enviado con éxito');

                const promoCodeSelector = 'input#codigoPromocion';
                await page.waitForSelector(promoCodeSelector, { state: 'visible', timeout });
                await page.fill(promoCodeSelector, config.codigoPromo!);
                console.log('Código de promoción ingresado con éxito');

                const continuarButtonSelector = 'input[type="submit"].btn.btn-accion.activo.m-0[value="Continuar"]';
                await page.waitForSelector(continuarButtonSelector, { state: 'visible', timeout });
                await page.click(continuarButtonSelector);
                console.log('Botón "Continuar" clickeado con éxito');

            } catch (error) {
                console.error('Error en la ventana', i + 1, error);
            }
        })();
    });

    await Promise.all(windowPromises);

    console.log('Todas las ventanas abiertas');
})()