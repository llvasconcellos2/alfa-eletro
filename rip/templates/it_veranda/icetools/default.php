<?php
//  Copyright:
//  Copyright (C) 2008 IceTheme. All Rights Reserved
//  
//  License:
//  Copyrighted Commercial Software 
//  
//  Author:
//  IceTheme - http://wwww.icetheme.com


// no direct access
defined('_JEXEC') or die('Restricted access');



/////  User (1-2-3) Modules  ////////////////////////////////////////////////////////////////////////////////////
$usertopmodule = 0;
if($this->countModules('user1')) $usertopmodule += 1;
if($this->countModules('user2')) $usertopmodule += 1;
if($this->countModules('user3')) $usertopmodule += 1;

switch ($usertopmodule) {
	case 1:
		$usertopmodwidth = "width3_user";
		break;
	case 2:
		$usertopmodwidth = "width2_user";
		break;
	case 3:
		$usertopmodwidth = "width1_user";
		break;
	default:
		$usertopmodwidth = "";
}

// separator For User (1-2-3)
$usermodule1separator = "";
$usermodule2separator = "";

if ($this->countModules('user1') && ($this->countModules('user2') || $this->countModules('user3'))) {
	$usetopmodsep1 = "separator";
}

if ($this->countModules('user2') && ($this->countModules('user3'))) {
	$usetopmodsep2 = "separator";
}


/////  User (4-5-6) Modules  ////////////////////////////////////////////////////////////////////////////////////

$userbotmodule = 0;
if($this->countModules('user4')) $userbotmodule += 1;
if($this->countModules('user5')) $userbotmodule += 1;
if($this->countModules('user6')) $userbotmodule += 1;

switch ($userbotmodule) {
	case 1:
		$userbottomodwidth = "width3_user";
		break;
	case 2:
		$userbottomodwidth = "width2_user";
		break;
	case 3:
		$userbottomodwidth = "width1_user";
		break;
	default:
		$userbottomodwidth = "";
}

// separator For User (4-5-6) 
$usermodule1separator = "";
$usermodule2separator = "";

if ($this->countModules('user4') && ($this->countModules('user5') || $this->countModules('user6'))) {
	$userbotmodsep1 = "separator";
}

if ($this->countModules('user5') && ($this->countModules('user6'))) {
	$userbotmodsep2 = "separator";
}


/////  Content (1-2) Modules  ////////////////////////////////////////////////////////////////////////////////////
$contenttopmodule = 0;
if($this->countModules('content1')) $contenttopmodule += 1;
if($this->countModules('content2')) $contenttopmodule += 1;

switch ($contenttopmodule) {
	case 1:
		$contenttopmodwidth = "width2_content";
		break;
	case 2:
		$contenttopmodwidth = "width1_content";
		break;
	default:
		$ucontenttopmodwidth = "";
}

// separator For Content (1-2) 
$contenttopseparator = "";

if ($this->countModules('content1') && ($this->countModules('content2'))) {
	$contenttopmodsep1 = "separator";
}

/////  Content (3-4) Modules  ////////////////////////////////////////////////////////////////////////////////////
$contentbottomodule = 0;
if($this->countModules('content3')) $contentbottomodule += 1;
if($this->countModules('content4')) $contentbottomodule += 1;

switch ($contentbottomodule) {
	case 1:
		$contentbottomodwidth = "width2_content";
		break;
	case 2:
		$contentbottomodwidth = "width1_content";
		break;
	default:
		$contentbottomodwidth = "";
}

// separator For Content (3-4) 
$contentbottomseparator = "";

if ($this->countModules('content3') && ($this->countModules('content4'))) {
	$contentbottomodsep1 = "separator";
}


/////  Banner (2-3-4) Modules  ////////////////////////////////////////////////////////////////////////////////////
$bannermodule = 0;
if($this->countModules('banner2')) $bannermodule += 1;
if($this->countModules('banner3')) $bannermodule += 1;
if($this->countModules('banner4')) $bannermodule += 1;

switch ($bannermodule) {
	case 1:
		$bannerewidth = "width100";
		break;
	case 2:
		$bannerewidth = "width50";
		break;
	case 3:
		$bannerewidth = "width33";
		break;	
	default:
		$bannerewidth = "";
}

// separator For Banner (2-3-4) 
$bannersep1 = "";
$bannersep2 = "";

if ($this->countModules('banner2') && ($this->countModules('banner3') || $this->countModules('banner4'))) {
	$bannersep1  = "separator";
}

if ($this->countModules('banner3') && ($this->countModules('banner4'))) {
	$bannersep2  = "separator";
}





/////  Bottom Modules  ////////////////////////////////////////////////////////////////////////////////////
$bottommodule = 0;
if($this->countModules('bottom1')) $bottommodule += 1;
if($this->countModules('bottom2')) $bottommodule += 1;
if($this->countModules('bottom3')) $bottommodule += 1;
if($this->countModules('bottom4')) $bottommodule += 1;
if($this->countModules('bottom5')) $bottommodule += 1;
if($this->countModules('bottom6')) $bottommodule += 1;

switch ($bottommodule) {
	case 1:
		$botmodwidth = "width100";
		break;
	case 2:
		$botmodwidth = "width50";
		break;
	case 3:
		$botmodwidth = "width33";
		break;
	case 4:
		$botmodwidth = "width25";
		break;
	case 5:
		$botmodwidth = "width20";
		break;
	case 6:
		$botmodwidth = "width16";
		break;			
	default:
		$botmodwidth = "";
}

// separator For Bottom Modules
$botmodsep1 = "";
$botmodsep2 = "";
$botmodsep3 = "";
$botmodsep4 = "";
$botmodsep5 = "";

if ($this->countModules('bottom1') && ($this->countModules('bottom2') || $this->countModules('bottom3') || $this->countModules('bottom4') || $this->countModules('bottom5')  || $this->countModules('bottom6'))) {
	$botmodsep1 = "separator";
}

if ($this->countModules('bottom2') && ($this->countModules('bottom3') || $this->countModules('bottom4') || $this->countModules('bottom5') || $this->countModules('bottom6'))) {
	$botmodsep2 = "separator";
}

if ($this->countModules('bottom3') && ($this->countModules('bottom4') || $this->countModules('bottom5') || $this->countModules('bottom6'))) {
	$botmodsep3 = "separator";
}

if ($this->countModules('bottom4') && ($this->countModules('bottom5') || $this->countModules('bottom6'))) {
	$botmodsep4 = "separator";
}

if ($this->countModules('bottom5') && ($this->countModules('bottom6'))) {
	$botmodsep5 = "separator";
}



/////  Top Modules  ////////////////////////////////////////////////////////////////////////////////////

$topmodule = 0;
if($this->countModules('top1')) $topmodule += 1;
if($this->countModules('top2')) $topmodule += 1;
if($this->countModules('top3')) $topmodule += 1;
if($this->countModules('top4')) $topmodule += 1;
if($this->countModules('top5')) $topmodule += 1;
if($this->countModules('top6')) $topmodule += 1;

switch ($topmodule) {
	case 1:
		$topmodulewidth = "width6";
		break;
	case 2:
		$topmodulewidth = "width5";
		break;
	case 3:
		$topmodulewidth = "width4";
		break;
	case 4:
		$topmodulewidth = "width3";
		break;
	case 5:
		$topmodulewidth = "width2";
		break;
	case 6:
		$topmodulewidth = "width1";
		break;			
	default:
		$topmodulewidth = "";
}

// separator For Top 1 - 6
$topmodsep1 = "";
$topmodsep2 = "";
$topmodsep3 = "";
$topmodsep4 = "";
$topmodsep5 = "";

if ($this->countModules('top1') && ($this->countModules('top2') || $this->countModules('top3') || $this->countModules('top4') || $this->countModules('top5')  || $this->countModules('top6'))) {
	$topmodsep1 = "separator";
}

if ($this->countModules('top2') && ($this->countModules('top3') || $this->countModules('top4') || $this->countModules('top5') || $this->countModules('top6'))) {
	$topmodsep2 = "separator";
}

if ($this->countModules('top3') && ($this->countModules('top4') || $this->countModules('top5') || $this->countModules('top6'))) {
	$topmodsep3 = "separator";
}

if ($this->countModules('top4') && ($this->countModules('top5') || $this->countModules('top6'))) {
	$topmodsep4 = "separator";
}

if ($this->countModules('top5') && ($this->countModules('top6'))) {
	$topmodsep5 = "separator";
}


/////  Promo Modules  ////////////////////////////////////////////////////////////////////////////////////

$promomodule = 0;
if($this->countModules('promo1')) $promomodule += 1;
if($this->countModules('promo2')) $promomodule += 1;
if($this->countModules('promo3')) $promomodule += 1;
if($this->countModules('promo4')) $promomodule += 1;
if($this->countModules('promo5')) $promomodule += 1;
if($this->countModules('promo6')) $promomodule += 1;

switch ($promomodule) {
	case 1:
		$promomodulewidth = "width100";
		break;
	case 2:
		$promomodulewidth = "width50";
		break;
	case 3:
		$promomodulewidth = "width33";
		break;
	case 4:
		$promomodulewidth = "width25";
		break;
	case 5:
		$promomodulewidth = "width20";
		break;
	case 6:
		$promomodulewidth = "width16";
		break;				
	default:
		$promomodulewidth = "";
}

// separator For Promo Modules
$promomodsep1 = "";
$promomodsep2 = "";
$promomodsep3 = "";
$promomodsep4 = "";
$promomodsep5 = "";

if ($this->countModules('promo1') && ($this->countModules('promo2') || $this->countModules('promo3') || $this->countModules('promo4') || $this->countModules('promo5')  || $this->countModules('promo6'))) {
	$promomodsep1 = "separator";
}

if ($this->countModules('promo2') && ($this->countModules('promo3') || $this->countModules('promo4') || $this->countModules('promo5') || $this->countModules('promo6'))) {
	$promomodsep2 = "separator";
}

if ($this->countModules('promo3') && ($this->countModules('promo4') || $this->countModules('promo5') || $this->countModules('promo6'))) {
	$promomodsep3 = "separator";
}

if ($this->countModules('promo4') && ($this->countModules('promo5') || $this->countModules('promo6'))) {
	$promomodsep4 = "separator";
}

if ($this->countModules('promo5') && ($this->countModules('promo6'))) {
	$promomodsep5 = "separator";
}




// Cookies
$cookie_prefix = "headline-";
$cookie_time = time()+30000000;
$ice_temp = array('FontSize','TemplateStyle');

foreach ($ice_temp as $tprop) {
    $ice_session = &JFactory::getSession();
	
	if (isset($_REQUEST[$tprop])) {
	    $$tprop = JRequest::getString($tprop, null, 'get');
    	$ice_session->set($cookie_prefix.$tprop, $$tprop);
    	setcookie ($cookie_prefix. $tprop, $$tprop, $cookie_time, '/', false);   
    	global $$tprop; 
    }
}

$Default_TemplateStyle 			= $this->params->get("TemplateStyle", "style1");
$Default_FontSize 				= $this->params->get("FontSize", "normal");
$template_baseurl				= $this->baseurl . '/templates/' . $this->template;

// Layout
$layout_leftcol_bgcolor			= $this->params->get("layout_leftcol_bgcolor", "ffffff");
$layout_rightcol_bgcolor		= $this->params->get("layout_rightcol_bgcolor", "ffffff");
$layout_leftcol_bordercolor		= $this->params->get("layout_leftcol_bordercolor", "ffffff");
$layout_rightcol_bordercolor	= $this->params->get("layout_rightcol_bordercolor", "ffffff");
$layout_leftcol_width			= $this->params->get("layout_leftcol_width", "192");
$layout_rightcol_width			= $this->params->get("layout_rightcol_width", "192");

// GO TO TOP link
$gotop_transition				= $this->params->get("gotop_transition", "linear");
$gotop_duration					= $this->params->get("gotop_duration", "1500");

// GZIP Compression
$gzip          		   			= ($this->params->get("gzip", 1)  == 0)?"false":"true";

//Main Menu
$mainnav_id						= $this->params->get("mainnav_id", "nav");
$mainnav_subid					= $this->params->get("mainnav_subid", "MainMenuSub");
$mainnav_effect					= $this->params->get("mainnav_effect", "slide and fade");
$mainnav_duration				= $this->params->get("mainnav_duration", "600");
$mainnav_transition				= $this->params->get("mainnav_transition", "Quad.easeOut");
$mainnav_delay					= $this->params->get("mainnav_delay", "1000");
$mainnav_orientation			= $this->params->get("mainnav_orientation", "horizontal");
$mainnav_direction_x			= $this->params->get("mainnav_direction_x", "right");
$mainnav_direction_y			= $this->params->get("mainnav_direction_y", "down");
$mainnav_opacity				= $this->params->get("mainnav_opacity", "90");
$mainnav_delay					= $this->params->get("mainnav_delay", "1000");

$mainnav_oneline         		= ($this->params->get("mainnav_oneline", 1)  == 0)?"false":"true";

//OtherMenu
$othermenu_height				= $this->params->get("othermenu_height", "325");
$othermenu_id					= $this->params->get("othermenu_id", "othermenu");
$othermenu_subid				= $this->params->get("othermenu_subid", "OtherMenuSub");
$othermenu_effect				= $this->params->get("othermenu_effect", "slide and fade");
$othermenu_duration				= $this->params->get("othermenu_duration", "600");
$othermenu_transition			= $this->params->get("othermenu_transition", "Quad.easeOut");
$othermenu_delay				= $this->params->get("othermenu_delay", "1000");
$othermenu_orientation			= $this->params->get("othermenu_orientation", "vertical");
$othermenu_direction_x			= $this->params->get("othermenu_direction_x", "right");
$othermenu_direction_y			= $this->params->get("othermenu_direction_y", "down");
$othermenu_opacity				= $this->params->get("othermenu_opacity", "90");
$othermenu_delay				= $this->params->get("othermenu_delay", "1000");



// Behavior
JHTML::_('behavior.mootools');
?>