<?php
namespace NeosRulez\React\CookieOptIn\Controller;

/*
 * This file is part of the NeosRulez.React.CookieOptIn package.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;

use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Eel\FlowQuery\Operations;

class RenderController extends ActionController {

    /**
     * @Flow\Inject
     * @var \NeosRulez\React\CookieOptIn\Service\MetadataService
     */
    protected $metadataService;

    /**
     * @Flow\Inject
     * @var \Neos\Flow\I18n\Service
     */
    protected $i18nService;

    /**
     * @Flow\Inject
     * @var \Neos\Flow\I18n\Translator
     */
    protected $translator;

    /**
     * @Flow\Inject
     * @var \Neos\ContentRepository\Domain\Service\ContextFactoryInterface
     */
    protected $contextFactory;

    /**
     * @Flow\Inject
     * @var \Neos\Neos\Service\LinkingService
     */
    protected $linkingService;

    /**
     * @return void
     */
    public function cookieDataAction() {
        $cookies = $this->metadataService->get();

        $context = $this->contextFactory->create();
        $node = $context->getCurrentSiteNode();

        $imprint = (new FlowQuery(array($node)))->find('[instanceof Neos.Neos:Document]')->filter('[is_imprint = true]')->context(array('workspaceName' => 'live'))->sort('_index', 'ASC')->get();
        $privacy = (new FlowQuery(array($node)))->find('[instanceof Neos.Neos:Document]')->filter('[is_privacy = true]')->context(array('workspaceName' => 'live'))->sort('_index', 'ASC')->get();

        if(!empty($imprint)) {
            $imprint_label = $imprint[0]->getProperty('title');
            $imprint_url = $this->getNodeUri($imprint[0]);
        } else {
            $imprint_label = '';
            $imprint_url = '/';
        }

        if(!empty($privacy)) {
            $privacy_label = $privacy[0]->getProperty('title');
            $privacy_url = $this->getNodeUri($privacy[0]);
        } else {
            $privacy_label = '';
            $privacy_url = '/';
        }

        $pages = ['imprint_label' => $imprint_label, 'privacy_label' => $privacy_label, 'imprint_url' => $imprint_url, 'privacy_url' => $privacy_url];

        $js = "var nrc_metadata = JSON.parse('" . $cookies . "');
var nrc_header = '" . $this->translator->translateById('header', [], null, null, $sourceName = 'Component/Modal', $packageKey = 'NeosRulez.React.CookieOptIn') . "';
var nrc_teaser = '" . $this->translator->translateById('body', [], null, null, $sourceName = 'Component/Modal', $packageKey = 'NeosRulez.React.CookieOptIn') . "';
var nrc_imprint_link = '" . $pages['imprint_url'] . "';
var nrc_privacy_link = '" . $pages['privacy_url'] . "';
var nrc_imprint_label = '" . $pages['imprint_label'] . "';
var nrc_privacy_label = '" . $pages['privacy_label'] . "';
var nrc_btn_all = '" . $this->translator->translateById('btn_all', [], null, null, $sourceName = 'Component/Modal', $packageKey = 'NeosRulez.React.CookieOptIn') . "';
var nrc_btn_essential = '" . $this->translator->translateById('btn_essential', [], null, null, $sourceName = 'Component/Modal', $packageKey = 'NeosRulez.React.CookieOptIn') . "';
var nrc_btn_selected = '" . $this->translator->translateById('btn_selected', [], null, null, $sourceName = 'Component/Modal', $packageKey = 'NeosRulez.React.CookieOptIn') . "';";
        header('Content-Type: application/javascript; charset=utf-8');
        return $js;
    }


    /**
     * @return string
     */
    public function getNodeUri($node) {
        $url = $this->linkingService->createNodeUri(
            $this->getControllerContext(),
            $node,
            null,
            'html',
            'false',
            [],
            '',
            false,
            []
        );
        return $url;
    }
}
