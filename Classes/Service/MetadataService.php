<?php
namespace NeosRulez\React\CookieOptIn\Service;

use Neos\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Yaml\Yaml;

/**
 *
 * @Flow\Scope("singleton")
 */
class MetadataService {

    /**
     * @Flow\Inject
     * @var \Neos\Flow\I18n\Service
     */
    protected $i18nService;

    /**
     * @var array
     */
    protected $settings;

    /**
     * @param array $settings
     * @return void
     */
    public function injectSettings(array $settings) {
        $this->settings = $settings;
    }

    /**
     * @return string
     */
    public function get() {
        $metadata = $this->loadMetaData();
        $json = json_encode($metadata, JSON_UNESCAPED_UNICODE);
        return $json;
    }

    /**
     * @return array
     */
    function loadMetaData() {
        $metadata_path = $this->settings['metadata'].$this->getLanguage().'/cookies.yml';
        $fileName = sprintf($metadata_path);
        return (array) Yaml::parseFile($fileName);
    }

    /**
     * @return void
     */
    function getLanguage() {
        return (string)$this->i18nService->getConfiguration()->getCurrentLocale();
    }


}
