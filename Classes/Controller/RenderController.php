<?php
namespace NeosRulez\React\CookieOptIn\Controller;

/*
 * This file is part of the NeosRulez.React.CookieOptIn package.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;

class RenderController extends ActionController {

    /**
     * @Flow\Inject
     * @var \NeosRulez\React\CookieOptIn\Service\MetadataService
     */
    protected $metadataService;

    /**
     * @return void
     */
    public function cookieDataAction() {
        $cookies = $this->metadataService->get();
        $js = "var nrc_metadata = JSON.parse('" . $cookies . "');
var nrc_imprint_link = '/impressum';
var nrc_privacy_link = '/datenschutz';
var nrc_imprint_label = 'Impressum';
var nrc_privacy_label = 'Datenschutz';
var nrc_btn_all = 'Alle erlauben';
var nrc_btn_essential = 'Nur Essenzielle';
var nrc_btn_selected = 'Nur ausgewählte Cookies erlauben';";
        header('Content-Type: application/javascript; charset=utf-8');
        return $js;
    }
}
