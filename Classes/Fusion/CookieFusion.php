<?php
namespace NeosRulez\React\CookieOptIn\Fusion;

use Neos\Flow\Annotations as Flow;
use Neos\Fusion\FusionObjects\AbstractFusionObject;

class CookieFusion extends AbstractFusionObject {

    /**
     * @Flow\Inject
     * @var \NeosRulez\React\CookieOptIn\Service\MetadataService
     */
    protected $metadataService;

    /**
     * @return string
     */
    public function evaluate() {
        $cookies = $this->metadataService->get();
        return json_encode($cookies);
    }

}
